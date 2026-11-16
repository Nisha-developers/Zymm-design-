const TEXT = "text-[14px] leading-[1.5] text-[#6b6f78] md:text-[11px] md:leading-[1.45]";
const LINK = "underline underline-offset-2";

const LOGO = (
  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black md:h-6 md:w-6 md:rounded-md">
    <svg
      viewBox="0 0 16 16"
      className="h-5 w-5 md:h-3.5 md:w-3.5"
      fill="white"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="2" height="6" rx="1" />
      <rect x="7" y="4" width="2" height="9" rx="1" />
      <rect x="11" y="8" width="2" height="5" rx="1" />
    </svg>
  </span>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#eeeff1] px-5 pb-16 pt-6 md:px-[6%] md:pb-24 md:pt-16">
      {/* Legal text */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-9">
        <div className={`space-y-5 md:space-y-4 ${TEXT}`}>
          <h3 className="font-semibold">Legal</h3>
          <p>
            Advisory services are provided by Autonomous Wealth Management LLC,
            an SEC registered investment adviser. Additional information about
            our services and fees is available in our{" "}
            <a href="#" className={LINK}>
              Firm Brochure
            </a>{" "}
            and{" "}
            <a href="#" className={LINK}>
              Client Relationship Summary
            </a>
            .
          </p>
          <p>
            The information and results presented are hypothetical and are
            provided for illustrative purposes only. Hypothetical performance
            does not represent actual trading and has inherent limitations. It
            is generated with the benefit of hindsight, based on assumptions,
            and does not reflect actual market conditions, trading costs,
            liquidity constraints, or the impact of economic and market
            factors. Past performance is not indicative of future results, and
            no guarantees are made that any investor will achieve similar
            results. Actual results will differ.
          </p>
          <p>
            This material is for informational purposes only and is not
            intended to provide personalized investment advice or
            recommendations. The investments and services offered may not be
            suitable for all investors. It is important that you consider your
            individual financial situation, investment objectives, and risk
            tolerance before choosing to invest.
          </p>
          <p>
            When you visit our site, we and our third-party partners may
            collect personal information about you, including through cookies
            and similar technology. To read more about our collection and
            sharing practices, click{" "}
            <a href="#" className={LINK}>
              here
            </a>
            .
          </p>
        </div>

        <div className={`space-y-5 md:space-y-4 ${TEXT}`}>
          <h3 className="font-semibold">Waitlist Referral Disclosure</h3>
          <p>
            Autonomous does not pay cash compensation for referrals to our
            firm. However, we do provide non-cash benefits in the form of
            higher scheduling priority or earlier access to certain services,
            if new clients open accounts with Autonomous using a promoter's
            referral link.
          </p>
          <p>
            Because promoters receive these benefits, a material conflict of
            interest exists, as they have an incentive to recommend Autonomous
            in order to receive enhanced access or priority.
          </p>
          <p>
            You are receiving this disclosure because the Investment Advisers
            Act of 1940 requires clients to be informed of any compensated
            endorsements. An endorsement includes any statement by a non-client
            that expresses approval, support, recommendation, or describes an
            experience with an advisor or its supervised persons. Promoters are
            non-clients or users who receive compensation – in the form of
            non-cash priority benefits – in exchange for referring you to
            Autonomous. As a result, the arrangement between promoters and
            Autonomous is considered an endorsement under the Advisers Act.
          </p>
          <p>
            Any time a promoter receives compensation for referring clients, a
            conflict of interest exists. A conflict of interest is any
            circumstance that could influence a person – consciously or
            unconsciously – to make a recommendation that is not entirely
            impartial. By receiving priority access as compensation, a
            promoter has an incentive to recommend Autonomous to you, which
            creates a material conflict of interest you should be aware of when
            evaluating the referral or signing up for Autonomous' services.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-14 border-t border-[#0a0a0a]/15 md:mt-14" />

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center gap-8 text-center md:mt-9 md:items-start md:gap-0 md:text-left">
        {LOGO}

        <div className="flex w-full flex-col items-center gap-8 md:mt-5 md:flex-row md:items-end md:justify-between md:gap-0">
          <div className={`space-y-1 md:space-y-1.5 ${TEXT}`}>
            <p>Copyright © 2026 Autonomous Technologies Group. All rights reserved.</p>
            <p>
              <a href="#">Privacy Policy</a>
            </p>
          </div>

          <nav className={`flex items-center gap-2 ${TEXT}`}>
            <a href="#">Get in touch</a>
            <span aria-hidden="true">·</span>
            <a href="#">X.com</a>
            <span aria-hidden="true">·</span>
            <a href="#">Threads</a>
            <span aria-hidden="true">·</span>
            <a href="#">LinkedIn</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;