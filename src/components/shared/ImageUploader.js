export default function ImageUploader({ onImageUpload }) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <span className="text-gray-600">
          Drop images here or click to upload
        </span>
        <span className="text-sm text-gray-500 mt-1">
          Supports: JPG, PNG, WEBP
        </span>
      </label>
    </div>
  );
}
