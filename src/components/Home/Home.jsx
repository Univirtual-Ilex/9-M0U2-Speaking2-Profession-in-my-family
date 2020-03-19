import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import {ButtonLink} from '../ButtonX'
import estilos_home from './Home_styles'



const Home_base = function ({...props}) { // se le pasan las props para recibir los styled components

    return (
        <Container {...props}  row bgImage="src/bg.png">

                    <div className='bloque-izquierdo entrada-top-Y-2'>
                        <div className='bloque-izquierdo-container'>
                            <h1> Professions in my family </h1>
                            <p>
                            Listen to each short description about different family members’ professions. Click on each picture and listen to the audio. Later, click on the button to record your voice and compare it with the original audio. 
                            <span className='negrilla'> <br/> <br/> ¡Time to practice your speaking skill!</span></p>
                            <ButtonLink to='/actividad1'>Start</ButtonLink>
                        </div>
                    </div>
                    <div className='bloque-derecho entrada-top-Y-3'>
                        <figure>
                            <img src='./src/cover.png' alt='Logo' />    
                        </figure>

                    </div>

        </Container>
    )
}

const Home = styled(Home_base)`
    ${ estilos_home }
`

export default Home