import React,{useState} from 'react'
import {Collapse,Radio} from 'antd';

const {Panel} = Collapse;

function RadioBox(props){

    console.log(props);    
    const [Value,setValue] = useState();

    const renderRadioBox=() => {
        props.list&& props.list.map(data=> (
            <Radio key={data._id} value>
                {data.name}
            </Radio>
        ))  
    }

    const handleChange= (e)=> {
        setValue(e.target.value);
        props.handleFilters(e.target.value);
    }

    return(
       <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="가격" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                         {renderRadioBox()}
                    </Radio.Group>
                 
                </Panel>
            </Collapse>
       </div>
    )
}

export default RadioBox