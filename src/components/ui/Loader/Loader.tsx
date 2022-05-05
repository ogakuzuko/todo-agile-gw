import type { LoaderProps } from '@mantine/core'
import { Grid, Loader as MantineLoader } from '@mantine/core'
import type { FC } from 'react'

export const Loader: FC<LoaderProps> = (props) => {
  return (
    // NOTE: 何故かLoaderを h-screen(=100vh) にすると、ガクガクなって安定しなかったので、一時的に99vhにしている
    <Grid justify="center" align="center" className="h-[99vh]">
      <MantineLoader size="lg" color="pink" variant="bars" {...props} />
    </Grid>
  )
}
