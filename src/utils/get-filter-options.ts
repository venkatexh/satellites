import type { Satellite } from '@/types/satellite'
import satellitesData from '../satellites.json'

export const countryCodeOptions = [
  ...new Set(
    (satellitesData as Satellite[]).filter((obj) => obj !== null).map((obj) => obj.countryCode)
  )
]

export const orbitRegimeOptions = [
  ...new Set(
    (satellitesData as Satellite[]).filter((obj) => obj !== null).map((obj) => obj.orbitCode)
  )
]

export const objectTypeOptions = [
  ...new Set(
    (satellitesData as Satellite[]).filter((obj) => obj !== null).map((obj) => obj.objectType)
  )
]
