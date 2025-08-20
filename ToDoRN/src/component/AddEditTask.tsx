import { View, Modal } from "react-native";
import { useTranslation } from "react-i18next";
import { CustomButton, HeadingText, Input } from "./commonComponent";
import styles from "../style/styles";
import { TaskData,  TaskResponse } from "../interface/interface";
import { ToastType, showMessage } from "../helper/helperFunction";
import { isTaskListValid } from "../helper/validation";
import { useEffect, useState } from "react";
import { CreateUpdateTaskApi } from "../networking/api";
import { message_type_success } from "../constant/constant.json";

const AddEditTask = ({propsData, addEditSuccess, isOpen, onClose} : {propsData:TaskData, 
    addEditSuccess:(id:string, item :TaskData)=>void
    isOpen: boolean, onClose: () => void}) => {

  const { t } = useTranslation();

    const [taskItem, setTaskItem] = useState<TaskData>(propsData)
    const [heading, setHeading]  = useState(t("add"))
    useEffect(()=>{
        setTaskItem(propsData)
        setHeading(propsData.id == "0" ? t("add") : t("edit"))
    },[propsData])

const handleEditCreateTask = async () => {
    let type: ToastType;
    let display_title: string;
    let message: string;
    const { id, task_title, task_list_refrence_id } = taskItem;
    if(!isTaskListValid(task_title)){
      type = "info"
      display_title = t("invalid_input")
      message = t("invalid_title")
      showMessage(display_title,message, type)
    }else{
        const response = (await CreateUpdateTaskApi({id, task_title, task_list_refrence_id})) as TaskResponse;
            display_title = response.message
            message = response.display_message
            if (response.message_type == message_type_success) {
                type = "success";
                if (response.data && response.data.length > 0) {
                    const item: TaskData = response.data[0];
                    addEditSuccess(id, item)
                    onClose()
                }
            } else {
                type = "error";
            }
        
        showMessage(display_title,message, type)
    }    
  };

    return(
          <Modal
             visible={isOpen}
             transparent
             animationType="fade"
             onRequestClose={onClose}>
        <>
        <View style={styles.modalStyleOuter}>
            <View style={styles.modalStyleInner}>
                <HeadingText text={heading}/>
                <View style={styles.oneComponentColumn}>
                    <Input value={taskItem.task_title} placeholder={t("title")} keyboardType="default"
                        onChangeText={text => {setTaskItem(prev => ({...prev, task_title: text}));}}/>
                </View>
                <CustomButton text={heading} onClick={handleEditCreateTask} />
            </View>
        </View>
        </>
        </Modal>
    )
}
export default AddEditTask