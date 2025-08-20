import {Touchable, TouchableOpacity, View} from 'react-native';
import { useTranslation } from "react-i18next";
import {LabelDetailText, LabelText, MaterialIcon} from './commonComponent';
import {LocalDateTime} from '../helper/helperFunction';
import {buttonBgColor, redColor} from '../style/color';
import { TaskListData } from '../interface/interface';

const TaskListItems = ({task, editClick, deleteClick, itemClick}:{task : TaskListData, 
  editClick:(item:TaskListData)=>void, deleteClick:(taskId : string)=>void,
  itemClick:(item:TaskListData)=>void,}) => {
  const { t } = useTranslation();

  return (
    <View key={task.id} style={{flexDirection: 'row', padding: 5}}>
      {/* title description  */}
      <TouchableOpacity onPress={()=>{itemClick(task)}} style={{flex: 1}}>
        <LabelText text={task.title} />
        <LabelText text={task.description} />
        <View>
          <LabelDetailText text={t('created_at') + LocalDateTime(task.created_at)}/>
          <LabelDetailText text={t('last_modified') + LocalDateTime(task.last_modify)} />
        </View>
      </TouchableOpacity>

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
export default TaskListItems