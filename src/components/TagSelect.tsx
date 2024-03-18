import { useState, useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { Tag } from "@/types/book";

type TagSelectProps = {
  selectedTags: number[];
  setSelectedTags: (value: number[]) => void;
};

const TagSelect: React.FC<TagSelectProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:5000/tags");
      const data = await response.json();
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleTagClick = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          clickable
          onClick={() => handleTagClick(tag.id)}
          color={selectedTags.includes(tag.id) ? "primary" : "default"}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default TagSelect;
