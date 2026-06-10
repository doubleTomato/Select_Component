import type { Option } from "../shared/types/select"

export const OptionCheckbox = ( { options }: { options: Option } ) => {
    return (
        <div className="text-left pl-5 py-2.5 border-b cursor-pointer hover:bg-gray-50">
            <input type="checkbox" name="item[]" value="1"/>
            <span className="inline-block ml-2.5">{options.label}</span>
        </div>
    )
}