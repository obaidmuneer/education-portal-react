import { CopyBlock, dracula } from "react-code-blocks";

const CodeBlocks = ({ code, language }) => {
    return (
        <CopyBlock
            customStyle={{
                maxHeight: '400px',
                overflow: 'scroll',
                textAlign: 'left',
            }}
            text={code}
            language={language}
            showLineNumbers={true}
            theme={dracula}
            codeBlock
            wrapLongLines={true}
        />
    )
}

export default CodeBlocks