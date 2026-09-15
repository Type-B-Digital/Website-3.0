/**
 * The Clutch wordmark — Figma node 3929:2042 (COMPONENT "Clutch_Logo_0 1",
 * instanced into every page's footer), exported from the file at 71x20 and
 * inlined unmodified.
 *
 * Inlined rather than loaded through <img>, for the reason ArrowRight already
 * gives: the letterforms take `currentColor`, so the logo matches the type
 * beside it instead of being pinned to one value. The artboard draws the mark
 * pure white while the rating text next to it is #F6F6F6; that one shade is
 * almost certainly an oversight in the mock rather than intent, and inheriting
 * removes the question.
 *
 * The DOT keeps Clutch's own red (#E62415) and is deliberately NOT
 * `currentColor`. It is the one part of the mark that belongs to Clutch rather
 * than to this page — recolouring another company's logo is not a styling
 * decision we get to make, and the export has it red even though the instance
 * carries a white fill above it.
 *
 * ⚠ Not on the token board, and it should not be: #E62415 is a third party's
 * brand colour that happens to sit near `orange.500` (#FF5315). Promoting it to
 * the ramp would invite someone to reach for it as if it were ours.
 */
const CLUTCH_RED = '#E62415'

export function ClutchLogo({ className }: { className?: string }) {
  return (
    <svg
      width="71"
      height="20"
      viewBox="0 0 71 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M52.3588 15.4087C53.6443 15.4087 54.6864 14.3731 54.6864 13.0956C54.6864 11.8182 53.6443 10.7826 52.3588 10.7826C51.0733 10.7826 50.0312 11.8182 50.0312 13.0956C50.0312 14.3731 51.0733 15.4087 52.3588 15.4087Z"
        fill={CLUTCH_RED}
      />
      <path
        d="M18.4807 0H21.5608V19.7391H18.4807V0ZM32.7787 13.6522C32.7787 16.713 30.2586 16.9565 29.4885 16.9565C27.5635 16.9565 27.2835 15.1652 27.2835 14.087V6.45217H24.1859V14.0696C24.1684 15.9652 24.7109 17.5304 25.7609 18.5739C26.7145 19.4187 27.9294 19.9152 29.2052 19.9816C30.481 20.048 31.7414 19.6803 32.7787 18.9391V19.7391H35.8763V6.45217H32.7787V13.6522ZM42.5615 1.98261H39.4639V6.45217H37.3113V9.35652H39.4639V19.7391H42.5615V9.35652H45.0991V6.45217H42.5615V1.98261ZM55.1269 15.9652C54.4269 16.5913 53.4994 16.9391 52.4844 16.9391C51.9687 16.9536 51.4555 16.8631 50.9764 16.6731C50.4972 16.4831 50.0623 16.1977 49.6984 15.8344C49.3344 15.4711 49.0491 15.0376 48.8601 14.5606C48.6711 14.0836 48.5823 13.5732 48.5992 13.0609C48.5992 10.8174 50.1918 9.25217 52.4844 9.25217C53.4819 9.25217 54.4269 9.58261 55.1444 10.2087L55.6345 10.6261L57.8045 8.46957L57.262 7.98261C55.9479 6.81779 54.2453 6.17943 52.4844 6.1913C48.4592 6.1913 45.5366 9.07826 45.5366 13.0435C45.5152 13.9576 45.68 14.8666 46.0212 15.7158C46.3623 16.565 46.8727 17.3369 47.5217 17.9851C48.1707 18.6333 48.9449 19.1444 49.7977 19.4876C50.6505 19.8309 51.5644 19.9993 52.4844 19.9826C54.3219 19.9826 56.037 19.3391 57.297 18.1739L57.822 17.687L55.617 15.5304L55.1269 15.9652ZM69.425 7.61739C68.4713 6.77262 67.2564 6.27608 65.9806 6.20969C64.7049 6.1433 63.4444 6.51101 62.4072 7.25217V0H59.3096V19.7391H62.4072V12.5565C62.4072 9.49565 64.9273 9.25217 65.6973 9.25217C67.6224 9.25217 67.9024 11.0435 67.9024 12.1217V19.7565H71V12.1217C71.0935 10.4726 70.5273 8.85359 69.425 7.61739ZM13.913 15.0087C13.3104 15.6239 12.589 16.1119 11.7922 16.4436C10.9953 16.7753 10.1393 16.9439 9.27533 16.9391C5.6877 16.9391 3.08011 14.1391 3.08011 10.2957C3.08011 6.43478 5.6877 3.63478 9.27533 3.63478C11.0079 3.63478 12.6529 4.31304 13.8955 5.54783L14.3855 6.03478L16.5381 3.89565L16.0656 3.4087C15.1776 2.51119 14.1177 1.79951 12.9485 1.31562C11.7793 0.83174 10.5244 0.585457 9.25783 0.591304C3.99014 0.591304 0 4.76522 0 10.313C0 15.8261 3.99014 20 9.25783 20C11.8654 20 14.2805 18.9913 16.0656 17.1652L16.5381 16.6783L14.403 14.5043L13.913 15.0087Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default ClutchLogo
