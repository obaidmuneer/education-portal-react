import { Grid, GridItem } from '@chakra-ui/react'

const tHeads = ['IP', 'Links', 'Actions']

function CGrid() {

    return (
        <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={1}
            minW='10px'
        >
            <GridItem colSpan={1} bg='tomato' >
                IP
            </GridItem>
            <GridItem colSpan={3} bg='tomato' >
                Links
            </GridItem>
            <GridItem colSpan={1} bg='tomato' >
                Actions
            </GridItem>
            {/* <GridItem colSpan={4} bg='tomato' /> */}

        </Grid>
    )
}

export default CGrid