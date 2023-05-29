import ChatMessage from '../../../common/UI/ChatMessage/ChatMessage';
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