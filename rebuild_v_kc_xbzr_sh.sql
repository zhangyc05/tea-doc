CREATE OR REPLACE
ALGORITHM = UNDEFINED
DEFINER=`root`@`localhost`
SQL SECURITY DEFINER
VIEW `textbook`.`v_kc_xbzr_sh` AS
SELECT
    `y`.`id` AS `jcyx_id`,
    `tea_dept`.`user_id` AS `user_id`,
    `c`.`id` AS `kc_id`,
    `c`.`mc` AS `kc_mc`,
    `c`.`kclx` AS `kclx`,
    `tea_dept`.`dep_id` AS `dep_id`
FROM (((((
    `textbook`.`textbook_jcyx_fw_tree` `a`
    JOIN `textbook`.`textbook_jcyx` `y` ON `a`.`select_id` = `y`.`id`
)
JOIN `textbook`.`textbook_basic_course` `c` ON `c`.`id` = `y`.`course_id`)
JOIN `textbook`.`sys_user_depart` `tea_dept` ON SUBSTR(`a`.`value`, 1, LENGTH(`a`.`value`) - 4) = `tea_dept`.`dep_id`)
JOIN `textbook`.`sys_user_role` `ru` ON `ru`.`user_id` = `tea_dept`.`user_id`)
JOIN `textbook`.`sys_role` `r` 
    ON `r`.`id` = `ru`.`role_id`
    AND `r`.`role_code` = 'xbzr'
    AND `a`.`cc` = 'YX'
    AND `c`.`kclx` = '专业课'
)

UNION ALL

SELECT
    `tea`.`id` AS `jcyx_id`,
    `jyszr_user`.`id` AS `user_id`,
    `c`.`id` AS `kc_id`,
    `c`.`mc` AS `kc_mc`,
    `c`.`kclx` AS `kclx`,
    `tea_dept`.`dep_id` AS `dep_id`
FROM (((((((
    `textbook`.`textbook_jcyx` `tea`
    JOIN `textbook`.`sys_user` `tea_user` ON `tea`.`yx_tea_no` = `tea_user`.`username`
)
JOIN `textbook`.`sys_user_depart` `tea_dept` ON `tea_user`.`id` = `tea_dept`.`user_id`)
JOIN `textbook`.`textbook_basic_course` `c` ON `tea`.`course_id` = `c`.`id`)
JOIN `textbook`.`sys_user_depart` `jyszr_dept` ON `tea_dept`.`dep_id` = `jyszr_dept`.`dep_id`)
JOIN `textbook`.`sys_user` `jyszr_user` ON `jyszr_dept`.`user_id` = `jyszr_user`.`id`)
JOIN `textbook`.`sys_user_role` `jyszr_user_role` ON `jyszr_user`.`id` = `jyszr_user_role`.`user_id`)
JOIN `textbook`.`sys_role` `jyszr_role` ON `jyszr_user_role`.`role_id` = `jyszr_role`.`id`
)
WHERE
    `jyszr_role`.`role_code` = 'xbzr'
    AND `c`.`kclx` = '公共课';