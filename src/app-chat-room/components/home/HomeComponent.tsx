import UiChatMessage from '../../../common/UI/ChatMessage/UiChatMessage';
import ChatRoomComponent from '../chat-room/ChatRoomComponent';
import styles from './HomeComponent.module.scss';

const HomeComponent = () => {
  return (
      <div className={styles.mainContent}>
        <ChatRoomComponent />
      </div>
  );
}

export default HomeComponent;