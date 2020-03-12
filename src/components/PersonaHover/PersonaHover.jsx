//Import
import React, { useRef } from 'react'
import styled from 'styled-components'
import styles from './PersonaHover_styles'
// components
import Tooltip from '../Tooltip'
import { useState, useEffect } from 'react'


// Componente base
const PersonaHover_base = ({profession, tooltip, ...props}) => {

    const [visible, mostrarTooltip] = useState(false)
    const [isRunning, setRunning] = useState(false)
    const [chunks, setChunks] = useState([])

    const ilxAudio = useRef()
    const handleClick = () => {
        mostrarTooltip(!visible)
    }


    useEffect(()=>{

            let capture = navigator.mediaDevices.getUserMedia({ audio: true })
            capture.then( stream => {
                const mediaRecorder = new MediaRecorder(stream)
                const audioChunks = [...chunks];
                    if(isRunning)
                        {
                            mediaRecorder.start()
                            console.log(mediaRecorder)
                            console.log(chunks)
                        } else if (mediaRecorder.state === 'recording') {
                            mediaRecorder.stop()
                            console.log("SE DETUVO ?")
                        }

                    // Si hay data registra todo en audioChunks
                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                        setChunks(audioChunks)
                    })
                    
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.play();
                        console.log('SONANDO')
                    })

            })


    }, [isRunning, chunks])


    return (
        <div {...props}>
                <div className={'person ' + profession } onClick={() => handleClick()}>
                </div>
                <div className='recorder'>
                    <button className='btn-clean' onClick={ () => setRunning(!isRunning) }>
                        <img src='./src/rec_btn_2.svg' alt='record your voice' />
                    </button>
                    <button className='btn-clean'>
                        <img src='./src/play_btn_2.svg' alt='listen to your voice' />
                    </button>
                </div>
                <div>
                    <Tooltip visible={visible} onClick={() => mostrarTooltip(!visible)} > {tooltip} </Tooltip>
                </div>
                <audio id="player"  ref={ilxAudio} controls></audio>
        </div>
    )
}
const PersonaHover = styled(PersonaHover_base)`${ styles }`
export default PersonaHover
