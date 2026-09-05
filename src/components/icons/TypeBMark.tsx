/**
 * type-b-mark — the B monogram alone, without the wordmark.
 *
 * Figma: "Union" — node 3729:3745, the footer update's statement column.
 * The full lockup (`TypeBLogo`, 97x32) still runs in the header; the updated
 * footer opens with this 24x24 square instead.
 *
 * Path data is the export's, unmodified. Two changes to the wrapper, both the
 * same treatment `TypeBLogo` and `ArrowRight` already get:
 *
 * - the export bakes `fill="#F6F6F6"`, correct on the footer ground and wrong
 *   anywhere else; `currentColor` makes one component serve both.
 * - `fillRule="evenodd"` is required, not cosmetic: the mark is a single
 *   boolean-operation path whose counters — the two bowls of the B and the
 *   notch at its foot — are subpaths, and without it they fill solid.
 */
export function TypeBMark({
  className,
  title = 'Type B Digital',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M21.5078 0C22.882 0 24 1.11802 24 2.49219V21.5078C24 22.882 22.882 24 21.5078 24H2.49219C1.11804 24 2.79325e-05 22.8819 0 21.5078V2.49219C2.76741e-05 1.11805 1.11804 4.48718e-05 2.49219 0H21.5078ZM10.7744 6.06543C10.6862 6.06544 10.6143 6.13733 10.6143 6.22559V7.71973C10.6143 7.80798 10.6862 7.87988 10.7744 7.87988H13.2217C13.798 7.87988 14.2449 8.01513 14.5615 8.28613C14.8777 8.55723 15.0361 8.94771 15.0361 9.45605C15.0361 9.96457 14.8778 10.341 14.5615 10.6182C14.2449 10.8952 13.7985 11.0332 13.2217 11.0332H10.498C10.4105 11.033 10.3401 10.9625 10.3398 10.875V8.26367C10.3398 8.17547 10.2679 8.1036 10.1797 8.10352H8.46484C8.37659 8.10352 8.30469 8.17541 8.30469 8.26367V17.7744C8.30471 17.8626 8.3766 17.9346 8.46484 17.9346H13.6963C14.3746 17.9346 14.991 17.7985 15.5449 17.5273C16.0984 17.2558 16.5344 16.8779 16.8506 16.3916C17.1668 15.9057 17.3252 15.3573 17.3252 14.7471C17.3252 13.9787 17.1188 13.3449 16.7061 12.8477C16.2933 12.3506 15.7591 12.0393 15.1035 11.915C15.6913 11.7115 16.1663 11.3722 16.5283 10.8975C16.8899 10.4228 17.0713 9.84618 17.0713 9.16797C17.0712 8.56924 16.9212 8.0353 16.6221 7.56641C16.3228 7.09743 15.9069 6.72975 15.376 6.46387C14.8445 6.19834 14.2282 6.06543 13.5273 6.06543H10.7744ZM13.3574 12.7969C13.9563 12.7969 14.4283 12.9384 14.7734 13.2207C15.1182 13.5035 15.291 13.9163 15.291 14.459C15.291 15.0016 15.1182 15.4004 14.7734 15.6885C14.4283 15.9763 13.9562 16.1201 13.3574 16.1201H10.498C10.4103 16.1199 10.3398 16.0487 10.3398 15.9609V12.9561C10.3398 12.8683 10.4103 12.7971 10.498 12.7969H13.3574ZM4.83691 6.06543C4.80207 6.06543 4.77344 6.09406 4.77344 6.12891V7.81641C4.77344 7.85125 4.80207 7.87988 4.83691 7.87988H7.9668C8.00164 7.87988 8.03027 7.85125 8.03027 7.81641V6.12891C8.03027 6.09406 8.00164 6.06543 7.9668 6.06543H4.83691Z"
      />
    </svg>
  )
}

export default TypeBMark
