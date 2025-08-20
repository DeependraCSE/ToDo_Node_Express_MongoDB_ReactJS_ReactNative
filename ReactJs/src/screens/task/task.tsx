import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMessage } from "../../globalmessage/messagecontext";
import type { AlertType } from "../../component/commonProps";
import {GetAllTaskByLastListApi,  DeleteTaskByIdApi, UpdateTaskStatusApi} from "../../networking/api";
import { TaskData, TaskResponse, type TaskListData } from "../../interface/interface";
import { message_type_success } from "../../constant/constant.json";
import { Label } from "../../component/commonComonent";
import AlertDialog from "../../component/alertDialog";
import TaskItem from "../../component/taskItem";
import AddEditTask from "../../component/addEditTask";
const Task = () => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const location = useLocation()
  const {showMessage} = useMessage()
  const paramsData = location.state as TaskListData;
  const [taskResponse, setTaskResponse] = useState<TaskResponse>(new TaskResponse());
  const [taskItem, setTaskItem] = useState<TaskData>(new TaskData());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState("");


  const getTask = async () => {
    const response = await GetAllTaskByLastListApi(paramsData?.id ?? "");
    console.log("getTask", response);

    let type: AlertType = response?.message_type == message_type_success ? "success" : "danger";
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
    setTaskResponse(response);
  };

  useEffect(() => {
    if(paramsData?.id?.length!! > 0){
      ResetTaskItem()
      getTask();
    }else{
      navigation(-1)
      showMessage(t("invalid_input"),t("invalid_move"), "danger")
    }
  }, []);

   const handleAddEditSuccess = (id:string, item :TaskData) => {
    ResetTaskItem();
    if (id == "0") {
      setTaskResponse((prev) => ({
        ...prev,
        data: [...(prev?.data ?? []), item],
      }));
    } else {
      setTaskResponse((prev) => ({
        ...prev,
        data: (prev?.data ?? []).map((task) =>
          task.id === item.id ? { ...task, ...item } : task
        ),
      }));
    }
  }

  const handleEditClick = (task : TaskData) => {
    setTaskItem((prev)=>({...prev,
      id: task.id,
      task_title: task.task_title,
      task_list_refrence_id:paramsData.id
    }))
  }
 
  const openDeleteDialog = (itemId : string) => {
    setIsDialogOpen(true)
    setDeletedItemId(itemId)
  }

  const handleDelete = async() => {
    const response = await DeleteTaskByIdApi(deletedItemId)
    console.log(response)
    let type : AlertType
     if (response.message_type == message_type_success) {
      type = "success";
      setTaskResponse((prev) => ({
            ...prev,
            data: prev?.data?.filter((item) => item.id !== deletedItemId) ?? []
          }));
    } else {
      type = "danger";
    }    
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const handleTaskOnChange = async(id:string, is_completed:boolean) =>{
    const response = await UpdateTaskStatusApi({id,is_completed})
    console.log(response)
    let type: AlertType;
    if (response.message_type == message_type_success) {
      type = "success";
      if (response.data && response.data.length>0) {
        const item: TaskData = response.data[0];
        setTaskResponse((prev) => ({
          ...prev,
          data: (prev?.data ?? []).map((task) =>
            task.id === item.id ? { ...task, ...item } : task
          ),
        }));
      }
    } else {
      type = "danger";
    }
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const ResetTaskItem = () => {
    setTaskItem((prev) => ({...prev,
           id: "0", task_title: "", task_list_refrence_id:paramsData.id }))
  };

  return (
    <div className="flex flex-col min-h-screen">
    <main>    
      <div className="max-h-screen h-full flex items-center justify-center">
        <div className="max-w-screen w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("task")}
          </h2>
          <h2 className="font-semibold text-blue-600">{paramsData?.title ?? ""}'s {t("task")}</h2><br/>
          
            
            <div className="flex space-x-4">
            <div className="flex-1">
              <AddEditTask
              propsData={taskItem}
              addEditCancel={ResetTaskItem}
              addEditSuccess={handleAddEditSuccess}
            />   
            </div>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white font-semibold rounded-xl transition duration-200 hover:bg-blue-700"
              onClick={() => {getTask()}} > {t("refresh")} </button>
          </div>

          <br />
          <hr />
          <br />

          {taskResponse?.data && taskResponse.data.length > 0 ? (
            <div className="space-y-3">
              {taskResponse.data.map((task) => (
                <TaskItem 
                  task={task}
                  editClick={handleEditClick}
                  deleteClick={(taskId)=>openDeleteDialog(taskId)}
                  handleTaskOnChange={handleTaskOnChange}
                />                
              ))}
            </div>
          ) : (
            <div>
              <Label htmlFor={""} text={t("no_data_found_please_add")} />
            </div>
          )}
        </div>
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("confirm_delete")}
        message={t("confirm_delete_message")}
      />
    </main>
    </div>
  );
};

export default Task;
