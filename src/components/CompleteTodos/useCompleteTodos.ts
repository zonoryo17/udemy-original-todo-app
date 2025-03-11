export const useCompleteTodos = () => {
  const handleCompleteTodoClear = () => {};

  const handleConfirm = () => {
    alert('削除しました');
  };
  return {
    handleCompleteTodoClear,
    handleConfirm,
  };
};
