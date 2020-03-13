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
    // States Audio recorder 
    const [isRecording, setRecording] = useState(false)
    const [chunks, setChunks] = useState([])
    let [mediaRecorder, setMediaRecorder] = useState(false)
    const ilxAudio = useRef()
    const handleClick = () => {
        mostrarTooltip(!visible)
    }



    const handleAudio = (status) => {
        let audioChunks =[]

        if (status === 'start') {
                mediaRecorder.start()
                setRecording(true)
        } else if (status === 'stop') {
                mediaRecorder.stop()
                setRecording(false)
        }
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
            setChunks(audioChunks)
        })

    }

    const playAudio = () => {
 
        const audioBlob = new Blob(chunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log('Playing')

    }

    useEffect(()=>{
        let consulta = navigator.mediaDevices.getUserMedia({ audio: true })
        consulta.then( audiostream => {
            const media = new MediaRecorder(audiostream)
            setMediaRecorder(media)
        })
    }, [])


    return (
        <div {...props}>
                <div className={'person ' + profession } onClick={() => handleClick()}>
                </div>
                <div className='recorder'>
                    <button className='btn-clean' onClick={ () => handleAudio(isRecording ? 'stop' : 'start') }>
                        <img src='./src/rec_btn_2.svg' alt='record your voice' />
                    </button>




                    <button className='btn-clean' onClick={ playAudio }>
                        <img src='./src/play_btn_2.svg' alt='listen to your voice' />
                    </button>
                </div>
                <div>
                    <Tooltip visible={visible} onClick={() => mostrarTooltip(!visible)} > {tooltip} </Tooltip>
                </div>
                {mediaRecorder.state + ''}
        </div>
    )
}
const PersonaHover = styled(PersonaHover_base)`${ styles }`
export default PersonaHover
