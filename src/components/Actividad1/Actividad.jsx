import React from 'react'
//Components
import Container from '../Container'
import MainTitle from '../MainTitle'
import ButtonUi from '../ButtonControlUI'
import {ICol, IRow} from '../Grid'
import PersonaHover from '../PersonaHover'
// Styles
import styled from 'styled-components'
import styles, { UiButtonsContainer } from './Actividad_styles'
import Ilex from '../../App/variables'

// Data
import data from './Actividad_data'








const Actividad_base =  ({...props}) => {
    return (
        <Container bgImage='./src/bg_actividad1.png' {...props} h={32}>
            
            <UiButtonsContainer>
                <ButtonUi icon='ilx-ayuda' tooltip='click on the images to hear the description of each profession' />
                <ButtonUi icon='ilx-volver' tooltip='Start Again' />
            </UiButtonsContainer>
            <IRow pt={1.5}>
                <ICol py={ 0.5 }>
                    <MainTitle color={Ilex.violeta2} size={1.5}>
                    LISTEN TO EACH DESCRIPTION, THEN CLICK ON THE RED BUTTON TO RECORD YOUR VOICE AND COMPARE IT WITH THE AUDIO
                    </MainTitle>  
                </ICol>
            </IRow>

            <IRow justify='center' align='center' w={100} gutters={0.5}>
                { data.map((item, index) => {
                    return(
                        <PersonaHover key={item.id} profession={item.profession} tooltip={item.tooltip}></PersonaHover>
                    )
                }) }

            </IRow>

        </Container>
    )

}

const Actividad = styled(Actividad_base)`
    ${ styles.mistyles }
`


export default Actividad