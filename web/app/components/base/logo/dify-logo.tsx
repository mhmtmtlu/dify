'use client'
import type { FC } from 'react'
import classNames from '@/utils/classnames'
import useTheme from '@/hooks/use-theme'
import { basePath } from '@/utils/var'
import { useGlobalPublicStore } from '@/context/global-public-context'
export type LogoStyle = 'default' | 'monochromeWhite'

export const logoPathMap: Record<LogoStyle, string> = {
  default: '/logo/logo.svg',
  monochromeWhite: '/logo/logo-monochrome-white.svg',
}

export type LogoSize = 'large' | 'medium' | 'small'

export const logoSizeMap: Record<LogoSize, string> = {
  large: 'h-7',
  medium: 'h-[22px]',
  small: 'h-4',
}

type DifyLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

const DifyLogo: FC<DifyLogoProps> = ({
  style = 'default',
  size = 'medium',
  className,
}) => {
  const { theme } = useTheme()
  const themedStyle = (theme === 'dark' && style === 'default') ? 'monochromeWhite' : style
  const { systemFeatures } = useGlobalPublicStore()
  const hasBrandingLogo = Boolean(systemFeatures.branding.enabled && systemFeatures.branding.workspace_logo)

  let src = `${basePath}${logoPathMap[themedStyle]}`
  if (hasBrandingLogo)
    src = systemFeatures.branding.workspace_logo

  return (
    <a href="https://genomsoft.com.tr" target="_blank">
      <img
        src={`${basePath}${logoPathMap[themedStyle]}`}
        className={classNames('block object-contain', logoSizeMap[size], className)}
        alt='Genomsoft logo'
      />
    </a>
  )
}

export default DifyLogo
