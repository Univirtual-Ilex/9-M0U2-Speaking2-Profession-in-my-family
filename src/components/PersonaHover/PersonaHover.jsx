//Import
import React from 'react'
import styled from 'styled-components'
import styles from './PersonaHover_styles'
// components
import Tooltip from '../Tooltip'
import { useState, useEffect } from 'react'
import {ICol} from '../Grid'



// Componente base
const PersonaHover_base = ({profession, tooltip, audiourl, ...props}) => {

    const [visible, mostrarTooltip] = useState(false)
    // States Audio recorder 
    const [isRecording, setRecording] = useState(false)
    const [chunks, setChunks] = useState(false)
    let [mediaRecorder, setMediaRecorder] = useState(false)
    const [isRunning, setRunning] = useState(false)
    const [runningAudio, setRunningAudio] = useState(true)
    const [audioState, setAudioState] = useState(false)



    const handleClick = () => {
        mostrarTooltip(!visible)
        setRunningAudio(!runningAudio)
        if(runningAudio) {
            audioState.play()
        } else {
            audioState.load()
            audioState.pause()
        }
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
        if (chunks) {
            setRunning(true)
            const audioBlob = new Blob(chunks)
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)
            audio.play()
            audio.onended = () => {
                setRunning(false)
            }
            console.log('Playing', audio)
        } else {
            alert('¡You must record your voice First!')
        }


    }

    useEffect(()=>{
        let consulta = navigator.mediaDevices.getUserMedia({ audio: true })
        consulta.then( audiostream => {
            const media = new MediaRecorder(audiostream)
            setMediaRecorder(media)
        })

        const audio = new Audio(audiourl)
        setAudioState(audio)
    }, [])


    return (
        <div {...props}>
                <div className={'person ' + profession } onClick={() => handleClick()}>
                </div>
                <ICol className='recorder' mt={0.7}>
                    <button className='btn-clean' onClick={ () => handleAudio(isRecording ? 'stop' : 'start') }>
                        <img src={isRecording ? './src/pause.svg' : './src/rec_btn_2.svg'} alt='record your voice' />
                    </button>

                    <button className='btn-clean' onClick={ playAudio }>
                        <img src={isRunning ? './src/pause.svg' : './src/play_btn_2.svg'} alt='listen to your voice' />
                    </button>
                </ICol>
                <div>
                    <Tooltip visible={visible} onClick={ ()=>handleClick(false) } > {tooltip} </Tooltip>
                </div>
        </div>
    )
}
const PersonaHover = styled(PersonaHover_base)`${ styles }`
export default PersonaHover
