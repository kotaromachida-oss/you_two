

interface IconUserProps {
  size: number
}

export default function IconUser({ size }: IconUserProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_1395)">
        <path d="M21 12C21 13.8569 20.4376 15.5825 19.4739 17.0157C17.858 19.4189 15.1136 21 12 21C8.88636 21 6.14202 19.4189 4.52609 17.0157C3.56237 15.5825 3 13.8569 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14.9999 15H8.99991C7.18816 15 5.65774 16.2045 5.16577 17.8564C6.81639 19.7808 9.26577 21 11.9999 21C14.7341 21 17.1834 19.7808 18.8341 17.8564C18.3421 16.2045 16.8117 15 14.9999 15Z" stroke="currentColor" strokeWidth="2"/>
      </g>
      <defs>
        <clipPath id="clip0_1_1395">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}