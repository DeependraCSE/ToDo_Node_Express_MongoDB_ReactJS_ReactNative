import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useState } from "react";
import {GetAllTaskByLastListApi,  DeleteTaskByIdApi, UpdateTaskStatusApi} from "../../networking/api";
import { TaskData, TaskResponse, TaskListData, RootStackParamList } from "../../interface/interface";
import { message_type_success } from "../../constant/constant.json";
import { showMessage, ToastType } from "../../helper/helperFunction";
import { FlatList, View, RefreshControl } from "react-native";
import {ItemSeparator, LabelText, MaterialIcon, TitleText } from "../../component/commonComponent";
import styles from "../../style/styles";
import AlertDialog from "../../component/AlertDialog";
import TaskItems from "../../component/TaskItems";
import AddEditTask from "../../component/AddEditTask";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
type NavProps = NativeStackNavigationProp<RootStackParamList>
type ReceivedProps = NativeStackScreenProps<RootStackParamList,"Task">



const Task = ({route }:ReceivedProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProps>()

  const paramsData : TaskListData = route.params
  const [taskResponse, setTaskResponse] = useState<TaskResponse>(new TaskResponse());
  const [taskItem, setTaskItem] = useState<TaskData>(new TaskData());
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState("");
  const [refreshing, setRefreshing] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>            
              <MaterialIcon text="add-circle-outline"  color="#4a88f2" onClick={()=>{                
                ResetTaskItem()
                setIsAddEditDialogOpen(true)
              }} />
          </View>
        ),
      });
    }, [navigation]);



  const getTask = async () => {
    setRefreshing(true)
    const response = await GetAllTaskByLastListApi(paramsData?.id ?? "");
    setRefreshing(false)
    let type: ToastType = response?.message_type == message_type_success ? "success" : "error";
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
    setTaskResponse(response);
  };

  useEffect(() => {
    if(paramsData?.id?.length!! > 0){
      ResetTaskItem()
      getTask();
    }else{
      //navigation(-1)
      showMessage(t("invalid_input"),t("invalid_move"), "error")
    }
  }, []);

  const handleAddEditSuccess = (id:string, item :TaskData) => {
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

  const openDeleteDialog = (itemId : string) => {
    setIsDialogOpen(true)
    setDeletedItemId(itemId)
  }

  const handleDelete = async() => {
    const response = await DeleteTaskByIdApi(deletedItemId)
    console.log(response)
    let type : ToastType
     if (response.message_type == message_type_success) {
      type = "success";
      setTaskResponse((prev) => ({
            ...prev,
            data: prev?.data?.filter((item) => item.id !== deletedItemId) ?? []
          }));
    } else {
      type = "error";
    }    
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const handleItemCheckedChange = async(id:string, is_completed:boolean) =>{
    const response = await UpdateTaskStatusApi({id,is_completed})
    let type: ToastType;
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
      type = "error";
    }
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const ResetTaskItem = () => {
    setTaskItem((prev) => ({...prev,
           id: "0", task_title: "", task_list_refrence_id:paramsData.id }))
  };

   const renderItem = ({item}:{item : TaskData}) => {
        return(
            <TaskItems 
                task={item}
                deleteClick={handleDeleteClick}
                editClick={handleEditClick}
                handleItemCheckedChange={handleItemCheckedChange}
            />    
        )
    }
    const handleDeleteClick = (taskId : string) => {
        openDeleteDialog(taskId)
    }
    const handleEditClick = (task : TaskData) => {
        setTaskItem(prev => ({
                            ...prev,
                            id: task.id,
                            task_title: task.task_title,
                            task_list_refrence_id:paramsData.id
                        }));
      setIsAddEditDialogOpen(true)
    }
  return (
    <>   
      <View style={styles.containerPlane}>
        <TitleText text={paramsData.title + `'s ` + t("task")}/>
         <FlatList
            data={taskResponse.data}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={taskResponse.data.length === 0 && styles.emptyContainer} // center empty view
            ListEmptyComponent={<LabelText text={t('no_data_found_please_add')} />}
            ItemSeparatorComponent={()=><ItemSeparator/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTask}/>}          
            />
            </View>


      <AddEditTask 
          propsData={taskItem}
          addEditSuccess={handleAddEditSuccess}
          isOpen={isAddEditDialogOpen}
          onClose={()=>setIsAddEditDialogOpen(false)}/>

      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("confirm_delete")}
        message={t("confirm_delete_message")}
      />
    </>
  );
};

export default Task;
