export default function() {
  return function(input) {
    return new Date(input).getTime();
  };
}
