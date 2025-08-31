export function imageOptimisation(
  url: string,
  size: "w_400" | "w_600" | "w_800" | "w_1000" = "w_600"
) {
  const optimizedImageUrl =
    url.split("upload")[0] + `upload/${size}` + url.split("upload")[1];

  return optimizedImageUrl;
}
