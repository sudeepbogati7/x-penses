import { useState, useCallback } from 'react'

export function useOTP(length: number) {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''))

  const setValue = useCallback((value: string) => {
    setOTP(value.split('').slice(0, length).concat(Array(length).fill('')).slice(0, length))
  }, [length])

  const handleChange = useCallback((index: number, value: string) => {
    setOTP(prev => {
      const newOTP = [...prev]
      newOTP[index] = value
      return newOTP
    })
  }, [])

  return {
    otp,
    otpValue: otp.join(''),
    setValue,
    handleChange
  }
}

