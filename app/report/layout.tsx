import type {
    ReactNode,
} from "react";

import styles from "./report-layout.module.css";

export default function ReportLayout({
                                         children,
                                     }: {
    children: ReactNode;
}) {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
}