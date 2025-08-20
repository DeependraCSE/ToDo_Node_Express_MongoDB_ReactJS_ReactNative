import { useEffect, useState } from "react";
import type { TaskData, TaskResponse } from "../interface/interface";
import { Button, TextInput } from "./commonComonent";
import { useTranslation } from "react-i18next";
import type { AlertType } from "./commonProps";
import { isTaskValid } from "../helper/validation";
import { CreateUpdateTaskApi } from "../networking/api";
import { message_type_success } from "../constant/constant.json";
import { useMessage } from "../globalmessage/messagecontext";

const AddEditTask = ({propsData, addEditSuccess, addEditCancel} : {propsData:TaskData, 
    addEditSuccess:(id:string, item :TaskData)=>void, 
    addEditCancel:()=>void}) => {

  const { t } = useTranslation();
  const { showMessage } = useMessage()

    const [taskItem, setTaskItem] = useState<TaskData>(propsData)
    const [heading, setHeading]  = useState(t("add"))

    useEffect(()=>{
        setTaskItem(propsData)
        setHeading(propsData.id == "0" ? t("add") : t("edit"))
    },[propsData])


    const handleEditCreateTaskList = async () => {
    let type: AlertType;
    let display_title: string;
    let message: string;
    const { id, task_title, task_list_refrence_id } = taskItem;
    if(!isTaskValid(task_title)){
      type = "info"
      display_title = t("invalid_input")
      message = t("invalid_title")
    }else{
      const response = (await CreateUpdateTaskApi({id, task_title, task_list_refrence_id})) as TaskResponse;
      display_title = response.message
      message = response.display_message
      if (response.message_type == message_type_success) {
        type = "success";
        if (response.data && response.data.length > 0) {
            const item: TaskData = response.data[0];
            addEditSuccess(id, item)
        }
      } else {
        type = "danger";
      }
    }    
    showMessage(display_title,message, type)
  };



    return(
        <div className="flex items-center space-x-4">
            <TextInput
              type="text"
              id="title"
              placeholder={t("title")}
              value={taskItem.task_title}
              onChange={(e) => {
                setTaskItem((prev) => ({ ...prev, task_title: e.target.value }));
              }}
            />

            <Button
              lable={heading}
              onClick={(e) => {
                e.preventDefault(), handleEditCreateTaskList();
              }}
            />
            <Button
              lable={t("cancel")}
              onClick={(e) => {
                e.preventDefault(), addEditCancel();
              }}
            />
          </div>
    )
}
export default AddEditTask