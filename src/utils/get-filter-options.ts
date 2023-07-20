import type { Satellite } from '@/types/satellite'
import satellitesData from '../satellites.json'

export const countryCodeOptions = [
  ...new Set(
    (satellitesData as Satellite[])
      .filter((satellite) => satellite !== null && satellite.countryCode !== null)
      .map((country) => country.countryCode)
  )
]

export const orbitRegimeOptions = [
  ...new Set(
    (satellitesData as Satellite[])
      .filter((satellite) => satellite !== null && satellite.orbitCode !== null)
      .map((obj) => obj.orbitCode)
  )
]

export const objectTypeOptions = [
  ...new Set(
    (satellitesData as Satellite[])
      .filter((satellite) => satellite !== null && satellite.objectType !== null)
      .map((obj) => obj.objectType)
  )
]
