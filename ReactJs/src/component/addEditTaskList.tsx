import { useEffect, useState } from "react";
import type { TaskListData, TaskListResponse } from "../interface/interface";
import { Button, TextInput } from "./commonComonent";
import { useTranslation } from "react-i18next";
import type { AlertType } from "./commonProps";
import { isTaskListValid } from "../helper/validation";
import { CreateUpdateTaskListApi } from "../networking/api";
import { message_type_success } from "../constant/constant.json";
import { useMessage } from "../globalmessage/messagecontext";

const AddEditTaskList = ({propsData, addEditSuccess, addEditCancel} : {propsData:TaskListData, 
    addEditSuccess:(id:string, item :TaskListData)=>void, 
    addEditCancel:()=>void}) => {

  const { t } = useTranslation();
  const { showMessage } = useMessage()

    const [taskListItem, setTaskListItem] = useState<TaskListData>(propsData)
    const [heading, setHeading]  = useState(t("add"))

    useEffect(()=>{
        setTaskListItem(propsData)
        setHeading(propsData.id == "0" ? t("add") : t("edit"))
    },[propsData])


    const handleEditCreateTaskList = async () => {
    let type: AlertType;
    let display_title: string;
    let message: string;
    const { id, title, description } = taskListItem;
    if(!isTaskListValid(taskListItem.title)){
      type = "info"
      display_title = t("invalid_input")
      message = t("invalid_title")
    }else if(!isTaskListValid(taskListItem.description)){
      type = "info"
      display_title = t("invalid_input")
      message = t("invalid_description")
    }else{
      const response = (await CreateUpdateTaskListApi({id, title, description})) as TaskListResponse;
      display_title = response.message
      message = response.display_message
      if (response.message_type == message_type_success) {
        type = "success";
        if (response.data && response.data.length > 0) {
            const item: TaskListData = response.data[0];
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
              value={taskListItem.title}
              onChange={(e) => {
                setTaskListItem((prev) => ({ ...prev, title: e.target.value }));
              }}
            />

            <TextInput
              type="text"
              id="description"
              placeholder={t("description")}
              value={taskListItem.description}
              onChange={(e) => {
                setTaskListItem((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
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
export default AddEditTaskList