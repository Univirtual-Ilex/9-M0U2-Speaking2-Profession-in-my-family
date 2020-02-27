import React, {useRef, useEffect, useState} from 'react'
//Components
import Container from '../Container'
import MainTitle from '../MainTitle'
import ButtonUi from '../ButtonControlUI'
import {ICol, IRow} from '../Grid'
// Styles
import styled from 'styled-components'
import styles, { UiButtonsContainer } from './Actividad_styles'
import Ilex from '../../App/variables'
import Area from '../AreaDrop'
import Modal from '../Generales/Modal'
// Data

import InputWords from '../InputWords'

import DraggableItem from '../Draggable'

const list_phrases = [
			{status: 1, phrase: '    You have to visit this beautiful town    '}, 
			{status: 1, phrase: '    Hey there!    '}, 
			{status: 1, phrase: '    a student from the Chemical Technology program    '}, 
			{status: 1, phrase: '    I come from Quinchía    '}, 
			{status: 1, phrase: '    Its main products are the coffee and the asparagus    '}];





const Actividad_base =  ({staticContext, ...props}) => {
	// Refs de las areas
    const area_0 = useRef()
    const area_1 = useRef()
    const area_2 = useRef()
    const area_3 = useRef()
    const area_4 = useRef()
	const p_length = list_phrases.length
	const [modalFlag, setModal] = useState(false)

    const setList = (id, val) =>{
		list_phrases[id].status = val
		checkList()
		}
	const checkList = () =>{
		console.log(list_phrases)
		var count = 0
		list_phrases.map((phrase, i) =>{
	        	if(phrase.status == 1){
	        		return setModal(false)
	        	}
	        	else if(i === p_length -1 && count == 4){
	        		if(phrase.status == 0)
	        			return setModal(true)
	        	}else{
	        		count ++
	        	}
	        })
	}
	const phrases = list_phrases.map((phrase, i) => 
			<li className="inline_list" id={i} key={i}>
				<DraggableItem elementId={i} areaDrag={'#area'} target={'area_' + i} status={phrase.status} check={setList}  name={phrase.phrase} ref={[area_0, area_1, area_2, area_3, area_4]} />
			</li>
		)

	/*const useEffect(() => {
	        list_phrases.map((phrase, i) =>{
	        	if(phrase.status == 1)
	        		return false
	        	else if(i === p_length -1){
	        		if(phrase.status == 0)
	        			return true
	        	}
	        })

	})*/
	
    return (
        <Container bgImage='./src/bg_actividad1.png' {...props} h={32} id="area">
            <div className="dnd" > 
	            <UiButtonsContainer>
	                <ButtonUi icon='ilx-ayuda' tooltip='Grab and drag the sentences to the correct phrase' />
	                <ButtonUi icon='ilx-volver' tooltip='Start Again' />
	            </UiButtonsContainer>
	            <IRow pt={1.5} className="text-center">
	                <ICol py={ 0.5 }>
	                    <MainTitle color={Ilex.violeta2} size={1.5}>
	                    READ THE TEXT AND COMPLETE THE PARAGRAPHS
	                    <br></br>
						WITH THE SENTENCES FROM THE BOX.
	                    </MainTitle>  
	                </ICol>
	            </IRow>

	            <IRow justify='center' align='center' w={100} gutters={0.5} className="text-center mt-0">
	            	<ICol mx={5} >
				      <IRow>
	                	<ul>  
							{phrases}
						</ul>
				      </IRow>
				      <IRow mt={10}  >
				      	<IRow justify='center' align='center' className="text-center">
				      		<strong>1.) &emsp;</strong> 
	    						<Area data-target="area_1" target="area_1" id="area_1" ref={area_1}>
									<InputWords name="&emsp;&emsp;&emsp;&emsp;&emsp;" />
								</Area>
								<p className="color_gray" >
								&emsp; My name is Santiago Pérez.
								</p>
				      		
						</IRow>
						<IRow justify='center' align='center' className="text-center">
				      		<strong>2.) &emsp;</strong> 
	    						<Area data-target="area_2" target="area_2" id="area_2" ref={area_2}>
									<InputWords name="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" />
								</Area>
								<p className="color_gray" >
								&emsp; of the UTP.
								</p>
				      		
						</IRow>
						<IRow justify='center' align='center' className="text-center">
				      		<strong>3.) &emsp;</strong> 
	    						<Area data-target="area_3" target="area_3" id="area_3" ref={area_3}>
									<InputWords name="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" />
								</Area>
								<p className="color_gray" >
								&emsp;, a small town in the department of Risaralda. My town is 110km from Pereira.
								</p>
				      		
						</IRow>
						<IRow justify='center' align='center' className="text-center">
				      		<strong>4.) &emsp;</strong> 
	    						<Area data-target="area_4" target="area_4" id="area_4" ref={area_4}>
									<InputWords name="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" />
								</Area>
								<p className="color_gray" >
								&emsp; its people are hard-working, kind and very friendly.
								</p>
				      		
						</IRow>
						<IRow justify='center' align='center' className="text-center">
				      		<strong>5.) &emsp;</strong> 
	    						<Area data-target="area_0" target="area_0" id="area_0" ref={area_0}>
									<InputWords name="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" />
								</Area>
				      		
						</IRow>
				      </IRow>

	                </ICol>
	            </IRow>
            </div>
        <Modal visible={modalFlag} ok w={25} nxtUrl='/actividad2' />
        </Container>
    )

}


const Actividad = styled(Actividad_base)`
    ${ styles.mistyles }
`


export default Actividad