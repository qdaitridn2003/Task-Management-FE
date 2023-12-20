import { useState } from 'react';

const useHidden = () => {
    const [isHidden, setIsHidden] = useState(false);
    const openHandler = () => setIsHidden(true);
    const closeHandler = () => setIsHidden(false);
    return { isHidden, openHandler, closeHandler };
};

export default useHidden;
