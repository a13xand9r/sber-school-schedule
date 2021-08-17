import React, { ReactNode } from 'react'
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device'
import { sberBox } from '@sberdevices/plasma-tokens'

export const Layout = ({ children }: { children: ReactNode }) => {
  return <>
    <DeviceThemeProvider theme={sberBox}>
      {children}
    </DeviceThemeProvider>
  </>
}