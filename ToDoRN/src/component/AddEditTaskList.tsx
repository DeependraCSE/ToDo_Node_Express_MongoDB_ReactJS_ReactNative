import { View, Modal } from "react-native";
import { useTranslation } from "react-i18next";
import { CustomButton, HeadingText, Input } from "./commonComponent";
import styles from "../style/styles";
import { TaskListData, TaskListResponse } from "../interface/interface";
import { ToastType, showMessage } from "../helper/helperFunction";
import { isTaskListValid } from "../helper/validation";
import { useEffect, useState } from "react";
import { CreateUpdateTaskListApi } from "../networking/api";
import { message_type_success } from "../constant/constant.json";

const AddEditTaskList = ({propsData, addEditSuccess, isOpen, onClose} : {propsData:TaskListData, 
    addEditSuccess:(id:string, item :TaskListData)=>void
    isOpen: boolean, onClose: () => void}) => {

  const { t } = useTranslation();

    const [taskListItem, setTaskListItem] = useState<TaskListData>(propsData)
    const [heading, setHeading]  = useState(t("add"))
    useEffect(()=>{
        setTaskListItem(propsData)
        setHeading(propsData.id == "0" ? t("add") : t("edit"))
    },[propsData])

const handleEditCreateTaskList = async () => {
    let type: ToastType;
    let display_title: string;
    let message: string;
    const { id, title, description } = taskListItem;
    if(!isTaskListValid(title)){
      type = "info"
      display_title = t("invalid_input")
      message = t("invalid_title")
      showMessage(display_title,message, type)
    }else if(!isTaskListValid(description)){
        type = "info"
        display_title = t("invalid_input")
        message = t("invalid_description")
        showMessage(display_title,message, type)
    }else{
        const response = (await CreateUpdateTaskListApi({id, title, description})) as TaskListResponse;
            display_title = response.message
            message = response.display_message
            if (response.message_type == message_type_success) {
                type = "success";
                if (response.data && response.data.length > 0) {
                    const item: TaskListData = response.data[0];
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
                    <Input value={taskListItem.title}  placeholder={t("title")} keyboardType="default"
                        onChangeText={text => {setTaskListItem(prev => ({...prev, title: text}));}}/>
                </View>

                <View style={styles.oneComponentColumn}>
                    <Input value={taskListItem.description}  placeholder={t("description")} keyboardType="default"
                        onChangeText={text => {setTaskListItem(prev => ({...prev, description: text}));}}/>
                </View>

                <CustomButton text={heading} onClick={handleEditCreateTaskList} />
            </View>
        </View>
        
        </>
        </Modal>
    )
}
export default AddEditTaskList