import { useCallback, useEffect, useRef, useState } from 'react';
import './UiScrollBox.scss';
import { set } from 'lodash';

type ScrollBoxProps = {
    children: any;
    getMessages: (roomId: string, offset: number, limit: number) => Promise<void>;
    loading?: boolean;
    messages: any;
};

const ScrollBox: React.FC<ScrollBoxProps> = (props) => {
    const DEFAULT_LIMIT = 50;
    const [offset, setOffset] = useState<number>(0);
    const boxRef = useRef<any>(null!);
    let autoScrollCompleted = useRef<boolean>(false);
    let previousScrollHeight = useRef<number>(0);
    let initialScrollAction = useRef<boolean>(true);


    useEffect(() => {
        if (!props.loading) {
            const boxElement = boxRef.current;
            boxElement.scrollTop = boxElement.scrollHeight - previousScrollHeight.current;
            autoScrollCompleted.current = true;

            if (initialScrollAction.current) {
                setTimeout(() => {
                    console.log('initialScrollAction: ', initialScrollAction.current);
                    console.log(props.messages);

                    initialScrollAction.current = false;
                    boxElement.scrollTop = boxElement.scrollHeight;
                    console.log('scrollHeight in messages: ', boxRef.current.scrollHeight);
                }, 400);
            }
        }

    }, [props.loading]);

    const handleScroll = useCallback(() => {
        console.log('scrollHeight: ', boxRef.current.scrollHeight);

        const boxElement = boxRef.current;
        const { scrollTop, scrollHeight } = boxElement;
        if (scrollTop <= scrollHeight * 0.2 && previousScrollHeight.current < scrollHeight && autoScrollCompleted.current) {
            autoScrollCompleted.current = false;
            const newOffset = offset + DEFAULT_LIMIT;
            previousScrollHeight.current = scrollHeight;
            setOffset(newOffset);
            props.getMessages('646907ab6c3802ad2cc4ccb9', newOffset, DEFAULT_LIMIT);
        }
    }, [offset]);


    useEffect(() => {
        const boxElement = boxRef.current;
        boxElement.addEventListener('scroll', handleScroll);
        return () => {
            boxElement.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="scroll-box" ref={boxRef}>
            {props.children}
        </div>
    );
};

export default ScrollBox;