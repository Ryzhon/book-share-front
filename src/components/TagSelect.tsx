import { useState, useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { Tag, TagSelectProps } from "@/types/Tag";
import { fetchTagsJson } from "@/services/bookService";

const TagSelect: React.FC<TagSelectProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await fetchTagsJson();
      setTags(tags);
    };
    try {
      fetchTags();
    } catch (err) {
      console.log(err);
    }
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
