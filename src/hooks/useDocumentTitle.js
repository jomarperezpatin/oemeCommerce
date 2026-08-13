import {useEffect} from 'react';

function useDocumentTitle(titulo) {
    useEffect(() => {
        document.title = titulo;
    }, [titulo]);
}

export default useDocumentTitle;