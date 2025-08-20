import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {GetAllTaskListApi, DeleteTaskListByIdApi} from "../../networking/api";
import { RootStackParamList, TaskListData, TaskListResponse } from "../../interface/interface";
import { message_type_success, ProfileMenuOption, ChangePasswordMenuOption,
  SettingMenuOption, LogoutMenuOption } from "../../constant/constant.json";
import { ClearStorage, showMessage, ToastType } from "../../helper/helperFunction";
import styles from "../../style/styles";
import { FlatList,  RefreshControl,  View } from "react-native";
import { ItemSeparator, LabelText,  MaterialIcon } from "../../component/commonComponent";
import AlertDialog from "../../component/AlertDialog";
import TaskListItems from "../../component/TaskListItems";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AddEditTaskList from "../../component/AddEditTaskList";
import CustomMenu from "../../component/CustomMenu";
type NavProps = NativeStackNavigationProp<RootStackParamList, "Task">

const TaskList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProps>()
  const [taskListResponse, setTaskListResponse] = useState<TaskListResponse>(new TaskListResponse());
  const [taskListItem, setTaskListItem] = useState<TaskListData>(new TaskListData());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState("");

   useEffect(() => {
    getTaskList();
    ResetTaskListItem()
  }, []);

  
   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          
            <MaterialIcon text="add-circle-outline"  color="#4a88f2" onClick={()=>{
              //navigation.navigate('ChangePassword');
              ResetTaskListItem()
              setIsAddEditDialogOpen(true)
            }} />

          <MaterialIcon text="account-circle"  color="#4a88f2" onClick={()=>{
              setIsMenuOpen(true)
            }} />
        </View>
      ),
    });
  }, [navigation]);

  const handleEditClick = (task : TaskListData) => {
    setTaskListItem(prev => ({
                        ...prev,
                        id: task.id,
                        title: task.title,
                        description: task.description,
                    }));
    
    setIsAddEditDialogOpen(true)
  }

  const handleDeleteClick = (taskId : string) => {
    openDeleteDialog(taskId)
  }
  
  const handleItemClick = (task : TaskListData) => {
    navigation.navigate("Task",task)
  }

  const getTaskList = async () => {
    setRefreshing(true)
    const response = await GetAllTaskListApi() as TaskListResponse
    setRefreshing(false)
    console.log(response);
    
    let type: ToastType = response?.message_type == message_type_success ? "success" : "error";
    showMessage(response.message ,response.display_message, type)
    setTaskListResponse(response);
  };

  const handleAddEditSuccess = (id:string, item :TaskListData) => {
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
    let type : ToastType
    if (response.message_type == message_type_success) {
      type = "success";
      setTaskListResponse((prev) => ({
            ...prev,
            data: prev?.data?.filter((item) => item.id !== deletedItemId) ?? []
          }));
    } else {
      type = "error";
    }
    showMessage(response?.message ?? "",response?.display_message ?? "", type)
  }

  const ResetTaskListItem = () => {
    setTaskListItem((prev)=>({...prev,
      id: "0", title: "", description: "" 
    }))
  };

  const renderItem = ({item}:{item : TaskListData}) => {
        return(
            <TaskListItems 
                task={item}
                deleteClick={handleDeleteClick}
                editClick={handleEditClick}
                itemClick={handleItemClick}
            />    
        )
  }

  const handleOnMenuOptionSelect = (option : number) => {
    switch (option) {
      case ProfileMenuOption:
        navigation.navigate("Profile");
        break;
      case ChangePasswordMenuOption:
        navigation.navigate("ChangePassword");
        break;
      case SettingMenuOption:
        navigation.navigate("Setting");
        break;
      case LogoutMenuOption:
        ClearStorage()
        navigation.replace("AuthRoot")
        break;
    }
  }

  return (
    <>
      <FlatList
          style={styles.containerPlane}
          data={taskListResponse.data}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={taskListResponse.data.length === 0 && styles.emptyContainer} // center empty view
          ListEmptyComponent={<LabelText text={t('no_data_found_please_add')} />}
          ItemSeparatorComponent={()=><ItemSeparator/>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTaskList}/>}
          />
      <AddEditTaskList
          propsData={taskListItem}
          addEditSuccess={handleAddEditSuccess}
          isOpen={isAddEditDialogOpen}
          onClose={()=>setIsAddEditDialogOpen(false)}
        />
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title={t('confirm_delete')}
        message={t('confirm_delete_message')}
      />
      {/* <Toast /> */}
      <CustomMenu open={isMenuOpen} close={()=>setIsMenuOpen(false)} onMenuOptionClick={handleOnMenuOptionSelect}/>
    </>
  );
};

export default TaskList;
