import React,{Component} from 'react'
import { Modal, Button } from 'antd';
import CitiesForm from '../Form'
import {addCitiesData,citiesUpdata} from '../Api'

class CitiesAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            visible: false,//控制列表展开
            type:this.props.type,
            key:'',
            name:''
          };
    }
    componentDidMount(){
    }
    componentWillUnmount(){
      this.setState=(state,callback)=>{
        return
      }
    }
      getFormData=async()=>{
          console.log(this.formRef.props.form.getFieldsValue());
          let data=this.formRef.props.form.getFieldsValue()

          await addCitiesData(data)
          this.formRef.props.form.resetFields();
          this.props.getAlldata()
      }
      updataData=async()=>{
        let data=this.formRef.props.form.getFieldsValue()
        const {key} = this.state
        await citiesUpdata(key,data.name,data.carType,data.shop,data.cityAdmin,data.runType,data.person)
        this.props.getAlldata()
      }
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
      getNewData=()=>{
        let title={}
        let Data=this.props.newData
        console.log('Data',Data);
        
        for (let key in Data) {
          if (key!=='key'&&key!=='cityID') {
            title[key] = Data[key]
          }
        }
        this.setState({
          key:Data.key,
          name:Data.name
        })
        console.log(title);
        setTimeout(()=>{
          console.log(this.formRef.props.form);
          this.formRef.props.form.setFieldsValue(title)
        },300)
      }
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 1500);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      render() {
        const { visible, loading,type } = this.state;
        return (
          <div>
            <Button type="primary" onClick={()=>{
              this.showModal()
              if(type!=='add'){this.getNewData()}
            }}>
              {type==='add'?'添加':'修改'}
            </Button>
            <Modal
              visible={visible}
              title={type==='add'?"添加数据":"修改数据"}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={()=>{
                  this.handleOk();
                  type==='add'?this.getFormData():this.updataData();
                  }}>
                  确认
                </Button>,
              ]}
            >
                <CitiesForm  wrappedComponentRef={(form) => this.formRef = form}></CitiesForm>
            </Modal>
          </div>
        );
      }
}
export default CitiesAdd