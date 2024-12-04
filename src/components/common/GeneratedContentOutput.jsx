import React, {useState} from 'react';
import {Box, Container} from "@mui/material";
import GeneratedContentButtons from "@/components/common/GeneratedContentButtons";
import Markdown from "markdown-to-jsx";

const GeneratedContentOutput = ({
	                                setContentHandler,
	                                loading,
	                                value,
	                                title,
	                                primaryButtonHandler,
	                                primaryButtonText,
	                                secondaryButtonHandler,
	                                secondaryButtonText,
	                                simple,
                                }) => {
	const [edit, setEdit] = useState(false);

	const Wrapper = simple ? Box : Container;

	return (
		<Wrapper sx={{position: simple ? 'static' : 'relative', transition: "1s", color: 'white', fontFamily: 'Inter'}}>
			<Markdown>{value}</Markdown>
			{!loading && <GeneratedContentButtons {...{
				primaryButtonHandler,
				primaryButtonText,
				secondaryButtonHandler,
				secondaryButtonText,
				loading,
				edit
			}} />}
		</Wrapper>
	);
};

export default GeneratedContentOutput;
