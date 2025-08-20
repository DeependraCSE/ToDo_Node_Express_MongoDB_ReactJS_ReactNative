import type { TaskListData } from "../interface/interface"
import { useTranslation } from "react-i18next";
import { LocalDateTime } from "../helper/helperFunction";

const TaskListItem  = ({task, editClick, deleteClick, itemClick}:{task : TaskListData, 
  editClick:(item:TaskListData)=>void, deleteClick:(taskId : string)=>void,
  itemClick:(item:TaskListData)=>void,}) => {

    const { t } = useTranslation();

    return(
        <div className="space-y-3">
              <div key={task.id}
                  className="justify-between items-center p-3 border rounded-lg shadow-sm bg-white">
                  <div className="flex justify-between items-center">
                    <button onClick={()=>itemClick(task)}>
                      <h2 className="font-semibold text-gray-800">
                        {task.title}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {task.description}
                      </p>
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editClick(task)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => deleteClick(task.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="text-gray-300 text-sm">
                        {t("created_at")}{LocalDateTime(task.created_at ?? "")}
                      </p>
                      <p className="flex-end text-gray-300 text-sm">
                        {t("last_modified")}{LocalDateTime(task.last_modify ?? "")}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
    )
    

}
export default TaskListItem