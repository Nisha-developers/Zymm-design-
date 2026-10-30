// Microphone level (Web Audio AnalyserNode) and a demo voice for mock mode.

// Real microphone. Calls onLevel(0..1) every frame. Resolves to a stop() function.
export async function startMic(onLevel) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  ctx.createMediaStreamSource(stream).connect(analyser);
  const samples = new Uint8Array(analyser.fftSize);
  let raf;
  const loop = () => {
    analyser.getByteTimeDomainData(samples);
    let sum = 0;
    for (const v of samples) {
      const d = (v - 128) / 128;
      sum += d * d;
    }
    onLevel(Math.min(1, Math.sqrt(sum / samples.length) * 4)); // quiet voice = small, loud voice = large
    raf = requestAnimationFrame(loop);
  };
  loop();
  return () => {
    cancelAnimationFrame(raf);
    stream.getTracks().forEach((track) => track.stop());
    ctx.close();
    onLevel(0);
  };
}

// A believable moving level for when there is no microphone / no audio stream to measure.
export function simulateLevel(onLevel) {
  const start = performance.now();
  const timer = setInterval(() => {
    const t = (performance.now() - start) / 1000;
    onLevel(Math.max(0, 0.45 + 0.3 * Math.sin(t * 7) + 0.15 * Math.sin(t * 13.3)));
  }, 50);
  return () => {
    clearInterval(timer);
    onLevel(0);
  };
}

// Demo voice: the browser's built-in speech. In live mode this is replaced by Kokoro audio from the backend.
// Returns cancel(). Always calls onEnd() once, even if there is no speech support.
export function speak(text, onLevel, onEnd) {
  const stopLevel = simulateLevel(onLevel);
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    stopLevel();
    onEnd?.();
  };
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  if (synth && typeof SpeechSynthesisUtterance !== 'undefined') {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = finish;
    utterance.onerror = finish;
    synth.speak(utterance);
    return () => {
      finished = true;
      stopLevel();
      synth.cancel();
    };
  }
  const timer = setTimeout(finish, Math.min(8000, 600 + text.length * 45));
  return () => {
    finished = true;
    clearTimeout(timer);
    stopLevel();
  };
}
