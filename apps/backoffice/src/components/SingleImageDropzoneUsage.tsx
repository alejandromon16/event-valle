import { Box, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useEdgeStore } from '../lib/edgestore';
import { SingleImageDropzone } from './SingleImageDropzone';
import { EditIcon } from '@chakra-ui/icons';

interface SingleImageDropzoneProps {
  name: string;
  value: string;
  onChange: (image: string, name: string) => void;
}

const SingleImageDropzoneUsage: React.FC<SingleImageDropzoneProps> = ({
  name,
  value,
  onChange,
}) => {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>(value);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleImageChange = async (file: File | undefined) => {
    if (file) {
      setFile(file);
      const newImage = await edgestore.myPublicImages.upload({
        file,
      });

      setImageUrl(newImage.url);
      onChange(newImage.url, name);
    }
  };

  const showOverlay = () => {
    setIsOverlayVisible(true);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  if(value){
    return (
      <Box>
        {!isOverlayVisible && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Suspense fallback={<Spinner size="lg" color="teal.500" />}>
                <Image
                  style={{
                    borderRadius: 10,
                    objectFit: 'contain',
                    maxHeight: '400px',
                    maxWidth: '400px',
                    borderColor: 'gray.300',
                  }}
                  width={400}
                  height={400}
                  src={value}
                  alt="image"
                />
              </Suspense>
              <EditIcon
                boxSize={6}
                color="teal.500"
                cursor="pointer"
                onClick={showOverlay}
              />
              <Box width={400} height={400} />
            </Box>
          )}
          {isOverlayVisible && (
            <SingleImageDropzone
              width={400}
              height={400}
              value={file}
              onChange={(file) => {
                handleImageChange(file);
              }}

            />
          )}
      </Box>
    )
  }

  return (
    <div>
      <SingleImageDropzone
              width={400}
              height={400}
              value={file}
              onChange={(file) => {
                handleImageChange(file);
              }}

            />
    </div>
  );
};

export default SingleImageDropzoneUsage;

