import { ReactNode } from 'react'
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device'

export const Layout = ({ children }: { children: ReactNode }) => {
    return <>
        <DeviceThemeProvider>
            {children}
        </DeviceThemeProvider>
    </>
}