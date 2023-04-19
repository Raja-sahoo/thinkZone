import React, { useState, useEffect } from 'react'
import Input from "../inputControl/Input"
import Select from '../inputControl/Select'

const inputControls = [
  {
    lbl: 'Name',
    tagName: 'input',
    type: 'text',
    name: 'uname',
    value: '',
    errMsg: 'please enter Name',
    isShowErr: false,
    // id:null
  },
  {
    lbl: 'Gender',
    tagName: 'input',
    type: 'radio',
    name: 'gender',
    options: ['male', 'female'],
    values: ['M', 'F'],
    value: '',
    errMsg: 'please select Gender ',
    isShowErr: false,
    // id:null
  },
  {
    lbl: 'Class',
    tagName: 'select',
    name: 'class',
    options: ['class1', 'class2', 'class3', 'class4', 'class5'],
    values: ['class1', 'class2', 'class3','class4', 'class5'],
    errMsg: 'please select Class',
    value: '',
    isShowErr: false,
    // id:null
  }
]

const Student = () => {

  const [data, setData] = useState(LocalStore())
  const [template, setTemplate] = useState('')
  const [act, setAct] = useState(false)
  let [uName, setUname] = useState()

  function LocalStore(){
    let data = localStorage.getItem("think");
    if(data){
      return JSON.parse(data)
    }else{
      return []
    }
  }
  // load template
  useEffect(() => {
    localStorage.setItem("think", JSON.stringify(data) )
    funPrepareRegTemplate()
  }, [data])



  const reset = ()=>{
    inputControls.map((obj) => {
      return obj.value = ''
    })
  }

  //update object onchange
  const fnChange = (e) => {
    const { name, value,  } = e.target;
    const inputControlObject = inputControls.find((obj) => {
      return obj.name === name;
    })
    inputControlObject.value = value;
    inputControlObject.isShowErr = false;
    if (!value) {
      inputControlObject.isShowErr = true;
    }
    funPrepareRegTemplate();
    console.log(inputControls)

  }

  // return the function with JSX template as per the condition 
  const funPrepareRegTemplate = () => {
    const templateArr = inputControls.map((obj, index) => {
      switch (obj.tagName) {
        case 'input':
          return <Input key={index} {...obj}  fnChange={fnChange} />
 
        case 'select':
          return <Select key={index} {...obj} fnChange={fnChange} />
          default:
          break;
 
      }
    })
    setTemplate(templateArr);
  }


  const fnRegister = () => {
    let dataObject = {}
    // let id = Math.floor(Math.random()*1000)
    inputControls.forEach((obj) => {
      if (!obj.value) {
        obj.isShowErr = true;
      }
      dataObject[obj.name] = obj.value;
      // dataObject["id"] = id;
    })
    setData([...data, dataObject])
    reset()
  }
  // edit action 
 const handelDelete=(e, id)=>{
  let selectedItem = data.filter(obj=>obj.uname !== id)
  setData(selectedItem)
  funPrepareRegTemplate();
  reset()
  }

  // edit action 
  const handelEdit=(e, id)=>{
    let findObj = data.find(obj=>obj.uname === id)
    let v = Object.values(findObj)
    if(findObj.uname === id){
      inputControls.map((item,i)=>{
       
          item.value = v[i]
      })
      funPrepareRegTemplate();
      // console.log(inputControls);
      // console.log(findObj);
     
  }
  setAct(true)
  setUname(findObj.uname)
  }
// update same edit action
const fnUpdate = ()=>{
  let allData = [...data]
  let obj3 = allData.find(obj=>obj.uname === uName) 
  let v = Object.keys(obj3)
  console.log(v);
  inputControls.map((item,i)=>{
      obj3[v[i]] =  item.value
  })
   setData(allData)
   setAct(false)
  // console.log(v);
  console.log(obj3);
  reset()
}


  return (
    <div>
      <div className='container'>
        <h1 className='mt-3 mb-3 text-center'>Register</h1>
        {template}
        <div className="row">
          <div className="offset-sm-4 mb-footer col-sm-5">
            {act === false ? <button onClick={fnRegister} className="btn btn-lg btn-primary">Add</button> :
              <button onClick={fnUpdate} className="btn btn-lg btn-primary">Update</button>}
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <table className='table table-bordered'>
        <tbody >
          {data.map((item, i) => {
            return <tr  key={i}>
              <td>{item.uname}</td>
              <td>{item.gender}</td>
              <td>{item.class}</td>
              <td><button onClick={(e)=>handelEdit(e, item.uname)} className='btn btn-info'>edit</button></td>
              <td><button onClick={(e)=>handelDelete(e, item.uname)} className='btn btn-danger'>delete</button></td>
              </tr>
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Student;
