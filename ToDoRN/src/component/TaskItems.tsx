import { View} from 'react-native';
import { useTranslation } from "react-i18next";
import {LabelDetailText, LabelText, MaterialIcon} from './commonComponent';
import {LocalDateTime} from '../helper/helperFunction';
import {buttonBgColor, redColor} from '../style/color';
import { TaskData } from '../interface/interface';
import CheckBox from "@react-native-community/checkbox";

const TaskItems = ({task, editClick, deleteClick, handleItemCheckedChange}:{task : TaskData, 
  editClick:(item:TaskData)=>void, deleteClick:(taskId : string)=>void,
  handleItemCheckedChange:(itemId:string, is_completed:boolean)=>void}) => {
  const { t } = useTranslation();

  return (
    <View key={task.id} style={{flexDirection: 'row', padding: 5}}>
      {/* title description  */}
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row'}}>
          <CheckBox value={task.is_completed} 
            onValueChange={(v)=>{console.log("checked change:", v), handleItemCheckedChange(task.id,v)}}/>
          <LabelText text={task.task_title} />
        </View>
        <View>
          <LabelDetailText text={t('created_at') + LocalDateTime(task.created_at)}/>
          <LabelDetailText text={t('last_modified') + LocalDateTime(task.last_modify)} />
        </View>
      </View>

      {/* edit & delete button */}
      <View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcon
            text={'edit'}
            color={buttonBgColor}
            onClick={()=>editClick(task)}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcon
            text={'delete'}
            color={redColor}
            onClick={() => deleteClick(task.id)}
          />
        </View>
      </View>
    </View>
  );
};
export default TaskItems