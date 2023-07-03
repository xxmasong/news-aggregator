export function ErrorAlert(e: any) {
  alert(
    Object.values(e.response.data.errors)
      .map((a: any) => a.join(","))
      .join("\n")
  );
}
