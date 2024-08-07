import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import useModelSearch from '../../hooks/useModelSearch';
import debounce from 'lodash/debounce';

const modelTypes = [
    { name: 'Audio Transcription', description: 'Convert audio recordings into text.' },
    { name: 'Audio Translation', description: 'Translate spoken language from audio into text or another language.' },
    { name: 'Chat Completions', description: 'Generate responses for chat-based interactions.' },
    { name: 'Completions', description: 'Generate text based on a given prompt or context.' },
    { name: 'Data Analysis', description: 'Analyze and extract insights from large datasets.' },
    { name: 'Edits', description: 'Make modifications to existing text or content.' },
    { name: 'Embeddings', description: 'Generate vector representations of text or other data types.' },
    { name: 'Image Editing', description: 'Modify or enhance images.' },
    { name: 'Image Generation', description: 'Create new images from scratch or based on specific criteria.' },
    { name: 'Image Variations', description: 'Generate different versions or variations of an image.' },
    { name: 'Knowledge Base', description: 'Provide structured information and answers on specific topics.' },
    { name: 'Language Detection', description: 'Identify the language of a given text.' },
    { name: 'Moderation', description: 'Review and filter content to ensure it meets community standards.' },
    { name: 'Orchestration', description: 'Coordinate and manage interactions between different processes or agents.' },
    { name: 'Recommendation', description: 'Suggest products or content based on user behavior and preferences.' },
    { name: 'Research', description: 'Conduct inquiries and gather data for analysis and insights.' },
    { name: 'Search', description: 'Find and retrieve information based on user queries.' },
    { name: 'Sentiment Analysis', description: 'Analyze text to determine the sentiment or emotional tone.' },
    { name: 'Speech Synthesis', description: 'Convert text into spoken words.' },
    { name: 'Speech to Text', description: 'Transcribe spoken language into written text.' },
    { name: 'Text Summarization', description: 'Generate concise summaries of longer text documents.' },
    { name: 'Text to Speech', description: 'Convert written text into spoken language.' },
    { name: 'Task Automation', description: 'Automate repetitive or predefined tasks.' },
    { name: 'Translation', description: 'Translate text from one language to another.' },
    { name: 'Video Editing', description: 'Modify or enhance video content.' },
    { name: 'Video Generation', description: 'Create new videos from scratch or based on specific criteria.' },
    { name: 'Product Recommendations', description: 'Suggest products based on user behavior and preferences.' },
    { name: 'Customer Support (Chatbots, FAQ Automation)', description: 'Handle customer queries and support through automated systems.' },
    { name: 'Search and Discovery (Visual Search)', description: 'Enhance product search and discovery using visual inputs.' },
    { name: 'Dynamic Pricing', description: 'Adjust prices based on market conditions and other factors.' },
    { name: 'Fraud Detection', description: 'Identify and prevent fraudulent activities.' },
    { name: 'Supply Chain Optimization', description: 'Optimize supply chain processes and logistics.' },
    { name: 'Customer Segmentation', description: 'Segment customers based on behavior for targeted marketing.' },
    { name: 'Sentiment Analysis (Product Reviews, Social Media Monitoring)', description: 'Analyze sentiment in product reviews and social media posts.' },
    { name: 'Image and Video Analysis', description: 'Analyze and interpret content in images and videos.' },
    { name: 'Voice and Speech Recognition', description: 'Recognize and interpret spoken language and commands.' },
    { name: 'Other', description: 'Custom or unspecified model types.' }
];

const ModelSearch = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [customType, setCustomType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { searchModels } = useModelSearch();

    const handleChange = (selectedOption) => {
        setSelectedType(selectedOption);
        if (selectedOption?.name !== 'Other') {
            setCustomType(''); // Clear custom type if a predefined type is selected
        }
    };

    const handleSearch = () => {
        searchModels(selectedType?.name === 'Other' ? customType : selectedType?.name);
    };

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const filterOptions = useMemo(() => {
        if (!inputValue) return modelTypes.map(type => ({ value: type.name, label: `${type.name} - ${type.description}` }));
        
        return modelTypes
            .filter(type => type.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map(type => ({ value: type.name, label: `${type.name} - ${type.description}` }));
    }, [inputValue]);

    const debouncedHandleInputChange = useCallback(
        debounce(handleInputChange, 300),
        []
    );

    return (
        <div>
            <Select
                options={filterOptions}
                onChange={handleChange}
                placeholder="Select or type model type"
                isClearable
                isSearchable
                onInputChange={(value) => debouncedHandleInputChange(value)}
                value={selectedType ? filterOptions.find(option => option.value === selectedType.name) : null}
            />
            {selectedType?.name === 'Other' && (
                <input
                    type="text"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    placeholder="Enter custom type"
                />
            )}
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default ModelSearch;