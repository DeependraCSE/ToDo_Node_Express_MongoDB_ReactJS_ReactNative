import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useMessage } from "../../globalmessage/messagecontext";
import type { AlertType } from "../../component/commonProps";
import {GetAllTaskListApi, DeleteTaskListByIdApi} from "../../networking/api";
import { TaskListData, TaskListResponse } from "../../interface/interface";
import { message_type_success } from "../../constant/constant.json";
import { Label } from "../../component/commonComonent";
import { Task } from "../../navigation/path";
import AlertDialog from "../../component/alertDialog";
import AddEditTaskList from "../../component/addEditTaskList";
import TaskListItem from "../../component/taskListItem";

const TaskList = () => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const { showMessage } = useMessage()
  const [taskListResponse, setTaskListResponse] = useState<TaskListResponse>(new TaskListResponse());
  const [taskListItem, setTaskListItem] = useState<TaskListData>(new TaskListData());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState("");

  const getTaskList = async () => {
    const response = await GetAllTaskListApi();
    console.log(response)
    let type: AlertType = response?.message_type == message_type_success ? "success" : "danger";
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
    setTaskListResponse(response);
  };

  useEffect(() => {
    getTaskList();
    ResetTaskListItem()
  }, []);

  const handleAddEditSuccess = (id:string, item :TaskListData) => {
    ResetTaskListItem();
    if (id == "0") {
      setTaskListResponse((prev) => ({
        ...prev,
        data: [...(prev?.data ?? []), item],
      }));
    } else {
      setTaskListResponse((prev) => ({
        ...prev,
        data: (prev?.data ?? []).map((task) =>
          task.id === item.id ? { ...task, ...item } : task
        ),
      }));
    }
  }

  const openDeleteDialog = (itemId : string) => {
    setIsDialogOpen(true)
    setDeletedItemId(itemId)
  }

  const handleDelete = async() => {
    const response = await DeleteTaskListByIdApi(deletedItemId)
    let type : AlertType
    if (response.message_type == message_type_success) {
      type = "success";
      setTaskListResponse((prev) => ({
            ...prev,
            data: prev?.data?.filter((item) => item.id !== deletedItemId) ?? []
          }));
    } else {
      type = "danger";
    }
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const ResetTaskListItem = () => {
    setTaskListItem((prev)=>({...prev,
      id: "0", title: "", description: "" 
    }))
  };

  const handleEditClick = (task : TaskListData) => {
    setTaskListItem((prev)=>({...prev,
      id: task.id,
      title: task.title,
      description: task.description,
    }))
  }
    
  const handleItemClick = (task : TaskListData) => {
    navigation(Task, { state:  task  })
  }


  return (
    <div className="flex flex-col min-h-screen">
    <main>
      <div className="max-h-screen h-full flex items-center justify-center">
        <div className="max-w-screen w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("task_list")}
          </h2>

          <div className="flex space-x-4">
            <div className="flex-1">
              <AddEditTaskList propsData={taskListItem} addEditSuccess={handleAddEditSuccess} 
                addEditCancel={ResetTaskListItem}/>
            </div>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white font-semibold rounded-xl transition duration-200 hover:bg-blue-700"
              onClick={() => {getTaskList()}} > {t("refresh")} </button>
          </div>
          <br />
          <hr />
          <br />

          {taskListResponse?.data && taskListResponse.data.length > 0 ? (
            <div className="space-y-3">
             {taskListResponse.data.map((task) => 
                <TaskListItem 
                  task={task}
                  editClick={handleEditClick}
                  deleteClick={(taskId)=>openDeleteDialog(taskId)}
                  itemClick={handleItemClick}
                  />
              )}
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

export default TaskList;