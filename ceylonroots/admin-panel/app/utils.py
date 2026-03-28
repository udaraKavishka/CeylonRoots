def csv_to_list(value: str | None) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def list_to_csv(values: list[str]) -> str:
    return ", ".join(values)
