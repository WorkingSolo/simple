import React from 'react';
import GeneratedContentOutput from "@/components/common/GeneratedContentOutput";

const StoryFinal = ({steps, setSteps, loading, story, setStory, offer, person, setLoading}) => {

	const previousStepHandler = () => {
		setStory('');
		setSteps(null);
		setTimeout(() => setSteps(steps - 1), 400);
	};


	const saveHandler = async () => {
		setLoading(true);
		const data = {
			title: person.Name,
			content: story,
			persona: [person?.id],
		};
		try {
			console.log({data});
			setLoading(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<GeneratedContentOutput
			loading={loading}
			title={'Final result'}
			value={story}
			setContentHandler={setStory}
			primaryButtonHandler={saveHandler}
			primaryButtonText={'Save'}
			secondaryButtonHandler={previousStepHandler}
			secondaryButtonText={'Previous step'}
		/>
	);
};

export default StoryFinal;
